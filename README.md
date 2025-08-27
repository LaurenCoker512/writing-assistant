# Story Prompt Generator

A lightweight Flask backend with React frontend that generates creative story prompts based on genre, theme, and weirdness factors using OpenAI's GPT model.

## Features

- **Genre Selection**: Choose from Fantasy, Sci-Fi, Mystery, Romance, or Horror
- **Theme Customization**: Select Comedy, Tragedy, Coming of Age, Redemption, or Betrayal themes
- **Weirdness Control**: Adjust creativity level from 1 (mainstream) to 5 (experimental)
- **One-Copy Copy**: Easily copy generated prompts to clipboard
- **Regeneration**: Generate new prompts with same or different parameters
- **Clean UI**: Modern interface built with React, TypeScript, and Tailwind CSS

## Tech Stack

### Backend

- Python 3.8+
- Flask
- Flask-CORS
- OpenAI API
- python-dotenv

### Frontend

- React 18
- TypeScript
- Tailwind CSS

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- OpenAI API account and API key

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create environment file:

```bash
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
echo "FLASK_ENV=development" >> .env
```

5. Replace `your_openai_api_key_here` with your actual OpenAI API key

6. Start the Flask server:

```bash
python app.py
```

The backend will run on http://localhost:5008

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend will run on http://localhost:5173

## Usage

1. Select a genre from the dropdown menu
2. Choose a theme for your story
3. Adjust the weirdness factor (1-5) to control creativity
4. Click "Generate Story Prompt"
5. Copy the result to clipboard or regenerate with different parameters

## API Endpoints

- `GET /api/options` - Returns available genres, themes, and weirdness levels
- `POST /api/generate` - Generates a story prompt with provided parameters

## Project Structure

```
story-prompt-generator/
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
└── frontend/
    ├── src/
    │   ├── components/     # React components
    │   ├── hooks/         # Custom React hooks
    │   ├── types/         # TypeScript definitions
    │   └── App.tsx        # Main application component
    ├── package.json       # Node dependencies
    └── tailwind.config.js # Tailwind configuration
```

## Customization

You can easily extend this application by:

1. Adding new genres or themes in `backend/app.py`
2. Modifying the prompt engineering in the `generate_story()` function
3. Adjusting the UI styling in the React components
4. Adding new parameters to control different aspects of story generation

## License

This project is open source and available under the MIT License.
