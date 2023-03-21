from typing import Union
from fastapi import FastAPI,Path
import os
from typing import Optional

app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello": "World"}

portMsg:str = "Port Number , Eg:5000"
protocolMsg:str = "Protocol , Eg:https"
returnMsg:str = "Enter 'true' to return path with port and protocol else 'false'"

@app.get("/aws/canverro/backend/url/{protocol}/{port}/{protocolvar}/")
async def read_awsLink(port:int = Path(None,description=portMsg),
                       protocol:str = Path(None,description=protocolMsg),
                       protocolvar:bool = Path(None,description=returnMsg))->str:
    f = open(os.path.join(os.getcwd(),"awsLink.txt"), "r")
    url = f.readline()
    if(protocolvar):
        url = "{protocol}://{url}:{port}".format(protocol=protocol,url=url,port=port)
    else:
        pass
    print(url)
    f.close()
    return url

@app.put("/aws/canverro/backend/url")
async def write_awsLink(base_url:str):
    f = open(os.path.join(os.getcwd(),"awsLink.txt"), "w+")
    res = f.write(base_url)
    print(res)
    f.close()
    return base_url


