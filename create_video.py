import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from moviepy import * 
# For v2, AudioFileClip is usually in top level or we try specific:
try:
    from moviepy.audio.io.AudioFileClip import AudioFileClip
except ImportError:
    pass # It might be in *
from gtts import gTTS

# Configuration
IMAGE_DIR = r"C:\Users\nickp\.gemini\antigravity\brain\5cc845e7-e714-46a6-9b66-ea471597b9d9"
OUTPUT_FILE = "gregory_mystery.mp4"
AUDIO_DIR = "audio_temp"
FPS = 24

if not os.path.exists(AUDIO_DIR):
    os.makedirs(AUDIO_DIR)

# Story data: Image filename suffix -> Caption
SCENES = [
    ("greg_scene_1_discovery", "The tragedy struck on a Tuesday. The Squeaky was GONE."),
    ("greg_scene_2_gear_up", "Detective Gregory was on the case immediately."),
    ("greg_scene_3_clues", "The clues led him to the living room..."),
    ("greg_scene_4_interrogation", "He interrogated the usual suspect. The Roomba said nothing."),
    ("greg_scene_5_found", "Wait... what IS that under the cushion?"),
    ("greg_scene_6_victory", "CASE CLOSED. The Squeaky is safe! Good boy, Gregory.")
]

def find_image_path(suffix):
    for file in os.listdir(IMAGE_DIR):
        if file.startswith(suffix) and file.endswith(".png"):
            return os.path.join(IMAGE_DIR, file)
    return None

def add_text_to_image(image_path, text):
    """Adds a cinematic subtitle to the image using PIL"""
    img = Image.open(image_path).convert("RGB")
    
    # Resize to HD if needed (keep aspect ratio)
    target_width = 1280
    ratio = target_width / img.width
    target_height = int(img.height * ratio)
    if target_height % 2 != 0: target_height -= 1
    
    img = img.resize((target_width, target_height), Image.Resampling.LANCZOS)
    
    draw = ImageDraw.Draw(img)
    
    try:
        font = ImageFont.truetype("arial.ttf", 46) # Slightly larger font
    except:
        font = ImageFont.load_default()

    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    x = (img.width - text_width) // 2
    y = img.height - text_height - 60
    
    # Outline
    outline_color = "black"
    for adj in range(-3, 4):
        draw.text((x+adj, y), text, font=font, fill=outline_color)
        draw.text((x, y+adj), text, font=font, fill=outline_color)
    
    # Text
    draw.text((x, y), text, font=font, fill="#FFD700") # Gold color
    
    return img

print("🎬 Starting narrated video creation...")

clips = []

for i, (suffix, caption) in enumerate(SCENES):
    path = find_image_path(suffix)
    if not path:
        print(f"❌ Could not find image for {suffix}")
        continue
        
    print(f"Processing scene {i+1}: {caption[:30]}...")
    
    # 1. Generate Voiceover
    audio_path = os.path.join(AUDIO_DIR, f"scene_{i}.mp3")
    try:
        tts = gTTS(text=caption, lang='en', tld='com')
        tts.save(audio_path)
        audio_clip = AudioFileClip(audio_path)
        duration = audio_clip.duration + 0.8 # Add padding for pacing
    except Exception as e:
        print(f"  ⚠️ Audio generation failed: {e}")
        duration = 4 # Fallback
        audio_clip = None

    # 2. Create Image Clip
    img_pil = add_text_to_image(path, caption)
    img_np = np.array(img_pil)
    
    # 3. Create Video Clip with duration matching audio
    clip = ImageClip(img_np).with_duration(duration)
    
    # 4. Attach Audio
    if audio_clip:
        clip = clip.with_audio(audio_clip)

    # 5. Effects (Skip fade for now to ensure compatibility)
    # clip = clip.with_effects([vfx.FadeIn(0.5)]) 
    
    clips.append(clip)

print("Stitching clips together...")
final_video = concatenate_videoclips(clips, method="compose")

# Add a final fade out to black (optional, skipping for safety)
# final_video = final_video.with_effects([vfx.FadeOut(1.0)])

print(f"Writing video file to {OUTPUT_FILE}...")
# audio_codec='aac' is important for browser compatibility
final_video.write_videofile(OUTPUT_FILE, fps=FPS, codec="libx264", audio_codec="aac")

print("✅ Video created successfully!")
