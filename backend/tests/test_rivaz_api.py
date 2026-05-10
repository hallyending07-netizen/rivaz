"""Backend API tests for Rivaz Boutique."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://rivaz-stitching.preview.emergentagent.com').rstrip('/')


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "Rivaz" in data["message"]


# ---------- Contact ----------
class TestContact:
    def test_create_contact_and_persistence(self, api_client):
        payload = {
            "name": "TEST_User",
            "phone": "9999999999",
            "message": "TEST_message - automated test"
        }
        r = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["phone"] == payload["phone"]
        assert data["message"] == payload["message"]
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "timestamp" in data

        # Verify persistence via GET
        list_r = api_client.get(f"{BASE_URL}/api/contact")
        assert list_r.status_code == 200
        contacts = list_r.json()
        assert isinstance(contacts, list)
        assert any(c.get("id") == data["id"] for c in contacts)

    def test_create_contact_validation_missing_field(self, api_client):
        # phone missing
        r = api_client.post(f"{BASE_URL}/api/contact", json={"name": "X", "message": "Y"})
        assert r.status_code == 422

    def test_create_contact_validation_empty(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/contact", json={})
        assert r.status_code == 422

    def test_get_contacts_returns_list_no_object_id(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/contact")
        assert r.status_code == 200
        contacts = r.json()
        assert isinstance(contacts, list)
        for c in contacts:
            assert "_id" not in c, "MongoDB _id should not be exposed"
