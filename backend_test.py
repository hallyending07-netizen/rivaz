import requests
import sys
from datetime import datetime
import json

class RivazBoutiqueAPITester:
    def __init__(self, base_url="https://rivaz-stitching.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    "test": name,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "response": response.text[:200]
                })

            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "error": str(e)
            })
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "error": str(e)
            })
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        success, response = self.run_test(
            "API Root",
            "GET",
            "api/",
            200
        )
        return success

    def test_create_contact(self):
        """Test contact form submission"""
        test_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "phone": "9876543210",
            "message": "This is a test message for Rivaz Boutique contact form"
        }
        
        success, response = self.run_test(
            "Create Contact Message",
            "POST",
            "api/contact",
            200,
            data=test_data
        )
        
        if success and isinstance(response, dict):
            # Verify response contains expected fields
            required_fields = ['id', 'name', 'phone', 'message', 'timestamp']
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing field in response: {field}")
                    return False
            
            # Verify data matches
            if response['name'] != test_data['name']:
                print(f"❌ Name mismatch: expected {test_data['name']}, got {response['name']}")
                return False
                
            if response['phone'] != test_data['phone']:
                print(f"❌ Phone mismatch: expected {test_data['phone']}, got {response['phone']}")
                return False
                
            if response['message'] != test_data['message']:
                print(f"❌ Message mismatch: expected {test_data['message']}, got {response['message']}")
                return False
                
            print(f"✅ Contact created with ID: {response['id']}")
            return True
        
        return success

    def test_get_contacts(self):
        """Test retrieving contact messages"""
        success, response = self.run_test(
            "Get Contact Messages",
            "GET",
            "api/contact",
            200
        )
        
        if success and isinstance(response, list):
            print(f"✅ Retrieved {len(response)} contact messages")
            if len(response) > 0:
                # Check structure of first contact
                contact = response[0]
                required_fields = ['id', 'name', 'phone', 'message', 'timestamp']
                for field in required_fields:
                    if field not in contact:
                        print(f"❌ Missing field in contact: {field}")
                        return False
                print("✅ Contact structure is valid")
            return True
        
        return success

    def test_invalid_contact_data(self):
        """Test contact form with invalid data"""
        # Test missing required fields
        invalid_data = {
            "name": "Test User"
            # Missing phone and message
        }
        
        success, response = self.run_test(
            "Invalid Contact Data (Missing Fields)",
            "POST",
            "api/contact",
            422,  # Validation error
            data=invalid_data
        )
        
        return success

    def test_cors_headers(self):
        """Test CORS headers are present"""
        try:
            response = requests.options(f"{self.base_url}/api/contact", timeout=10)
            cors_headers = [
                'access-control-allow-origin',
                'access-control-allow-methods',
                'access-control-allow-headers'
            ]
            
            missing_headers = []
            for header in cors_headers:
                if header not in [h.lower() for h in response.headers.keys()]:
                    missing_headers.append(header)
            
            if missing_headers:
                print(f"❌ Missing CORS headers: {missing_headers}")
                return False
            else:
                print("✅ CORS headers present")
                return True
                
        except Exception as e:
            print(f"❌ CORS test failed: {str(e)}")
            return False

def main():
    print("🚀 Starting Rivaz Boutique API Tests")
    print("=" * 50)
    
    # Setup
    tester = RivazBoutiqueAPITester()
    
    # Run tests
    tests = [
        tester.test_api_root,
        tester.test_create_contact,
        tester.test_get_contacts,
        tester.test_invalid_contact_data,
        tester.test_cors_headers
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test {test.__name__} crashed: {str(e)}")
            tester.failed_tests.append({
                "test": test.__name__,
                "error": str(e)
            })

    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failure in tester.failed_tests:
            print(f"   - {failure.get('test', 'Unknown')}: {failure.get('error', failure.get('response', 'Unknown error'))}")
    
    success_rate = (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0
    print(f"📈 Success Rate: {success_rate:.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())