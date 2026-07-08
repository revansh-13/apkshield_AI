from pprint import pprint
from app.core.parsers import load_apk, parse_apk


APK_PATH = r"C:\Users\Revansh Singh\Downloads\sample.apk"

# loader_result = load_apk(APK_PATH)

# if not loader_result["success"]:
#     print(loader_result["error"])
#     exit()
# pprint(report)

loader_result = load_apk(APK_PATH)
report = parse_apk(loader_result)

apk = loader_result["apk"]
certificates = apk.get_certificates()
certificate = certificates[0]

pprint(report["certificates"])