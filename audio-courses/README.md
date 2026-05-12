# Audio Narrations

This folder will be populated with **56 MP3 narrations** (one per lesson plus
chapter intros and study plans) covering both courses. Total size ~248 MB --
that is why the MP3s themselves are gitignored.

## Generate them

```pwsh
pip install -r tools\requirements.txt
python tools\build_audio.py
```

The script uses Microsoft Edge's online TTS (free, no API key) and takes
~8 minutes on a decent connection with concurrency 4.

## Customize

```pwsh
# British male voice, 10% faster
python tools\build_audio.py --voice en-GB-RyanNeural --rate +10%

# Only the AI interview course
python tools\build_audio.py --course ai

# Smoke test (first 3 lessons)
python tools\build_audio.py --limit 3

# Re-render even if the MP3 already exists
python tools\build_audio.py --force
```

See the docstring of `tools/build_audio.py` for the full flag list and
[edge-tts voices](https://github.com/rany2/edge-tts) for alternative voices.

## Output layout

```
audio-courses/
├── react-snooker-course/
│   ├── README.mp3
│   ├── STUDY_PLAN.mp3
│   └── chapter-XX-…/
│       ├── README.mp3
│       └── 0X-…mp3
└── ai-interview-course/
    └── … same shape
```

Recommended player: anything that supports playlists (VLC, Foobar2000, your
phone). Drop a chapter folder into the queue and listen during commutes.
