import unittest
from unittest.mock import patch, MagicMock
from app import app

class WritingAssistantTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_generate_story_no_input(self):
        response = self.app.post('/api/generate', json={})
        self.assertEqual(response.status_code, 400)
        data = response.get_json()
        self.assertIn('error', data)

    @patch("openai.resources.chat.completions.Completions.create")
    def test_generate_story_valid_input(self, mock_create):
        # Mock the OpenAI response
        mock_response = MagicMock()
        mock_response.choices = [MagicMock(message=MagicMock(content="Mocked story prompt."))]
        mock_create.return_value = mock_response

        response = self.app.post('/api/generate', json={
            'genre': 'Fantasy',
            'theme': 'Discovery',
            'weirdness': 3
        })
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('prompt', data)
        self.assertEqual(data['prompt'], "Mocked story prompt.")

    def test_get_options(self):
        response = self.app.get('/api/options')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('genres', data)
        self.assertIn('themes', data)
        self.assertIn('weirdnessLevels', data)

if __name__ == '__main__':
    unittest.main()