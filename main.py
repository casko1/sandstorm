import asyncio
import eel
from detection.detect import detect_track

eel.init("web")
loop = asyncio.new_event_loop()


@eel.expose
def detect(start, end, url):
    out = asyncio.run(detect_track(start, end, url))
    return out


if __name__ == "__main__":
    asyncio.set_event_loop(loop)
    eel.start("index.html")



