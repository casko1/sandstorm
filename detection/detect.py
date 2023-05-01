from detection import preprocess
from shazamio import Shazam
import tempfile


async def detect_track(start, end, url):
    with tempfile.TemporaryDirectory() as tempdirname:
        path = preprocess.extract_segment(url, int(start), int(end), tempdirname)
        shazam = Shazam()
        out = await shazam.recognize_song(f'{path}.ogg')
        return out
