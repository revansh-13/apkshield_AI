from androguard.misc import AnalyzeAPK

apk, dex, analysis = AnalyzeAPK(r"C:\Users\Revansh Singh\Downloads\sample.apk")

print(type(dex))
print(type(dex[0]))
print(dir(dex[0]))