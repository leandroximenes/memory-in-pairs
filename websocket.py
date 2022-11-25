#!/usr/bin/env python
import asyncio
import websockets
from datetime import datetime
from pytz import timezone

async def show_time(websocket):
    while True:
        format = "%Y-%m-%d %H:%M:%S"
        now_utc = datetime.now(timezone('America/Sao_Paulo'))
        await websocket.send(now_utc.strftime(format))
        await asyncio.sleep(1)

async def main():
    async with websockets.serve(show_time, host="", port=5678):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())