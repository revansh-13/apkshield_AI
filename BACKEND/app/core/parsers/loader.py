from androguard.misc import AnalyzeAPK

from loguru import logger

logger.remove()
logger.add(
    lambda msg: print(msg, end=""),
    level="ERROR"
)

def load_apk(saved_path: str):

    try:

        apk, dex, analysis = AnalyzeAPK(saved_path)

        return {
            "success": True,
            "apk": apk,
            "dex": dex,
            "analysis": analysis
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }