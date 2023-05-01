import yt_dlp
import time


def extract_segment(url, start, end, tempdir):
    path = f"{tempdir}/{str(int(time.time()))}"
    ydl_opts = {
        'format': 'm4a/bestaudio',
        'download_ranges': yt_dlp.utils.download_range_func([], [(start, end)]),
        'quiet': 'true',
        'postprocessors': [
            {
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'vorbis',
            },
        ],
        'outtmpl': f'{path}.%(ext)s',
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download(url)
        return path
