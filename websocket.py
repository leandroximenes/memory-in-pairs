#!/usr/bin/env python

import asyncio
import json
import signal
import os
import websockets

USERS = set()
PLAYERS = []

class Player():
    def __init__(self, userId, name, email, connection):   # constructor function using self
        self.userId = userId
        self.name = name
        self.email = email
        self.connection = connection
        self.room = None

    def __str__(self):
        return "Player: " + self.name + " " + self.email + " " + self.room
    
    def setRoom(self, room):
        self.room = room

def getPlayers():
    list = []
    for player in PLAYERS:
        if(player.room == None):
            list.append({"name": player.name, "email": player.email })
    
    return list

def getRooms():
    list = []
    for player in PLAYERS:
        if(player.room != None):
            list.append({"name": player.name, "email": player.email, "room": player.room })
    
    return list
   
async def handler(websocket):
    global USERS, PLAYERS
    try:
        # Send current state to user
        USERS.add(websocket)
        # Manage state changes
        async for message in websocket:
            event = json.loads(message)
            if event["action"] == "registerPlayer":
                player = Player(event["userId"], event["name"], event["email"], websocket.id)
                PLAYERS.append(player)
                await websocket.send(json.dumps({"type": "conected"}))
            
            elif event["action"] == "loadData":
                websockets.broadcast(USERS, json.dumps({"type": "players", "users": getPlayers()}))
                websockets.broadcast(USERS, json.dumps({"type": "rooms", "users": getRooms()}))
            
            elif event["action"] == "enterRoom":
                for player in PLAYERS:
                    if player.connection == websocket.id:
                        player.setRoom(event["roomName"])
                        break
                    
                
                websockets.broadcast(USERS, json.dumps({"type": "players", "users": getPlayers()}))
                websockets.broadcast(USERS, json.dumps({"type": "rooms", "users": getRooms()}))
            
            else:
                print(f"unsupported event: %s", event)
    finally:
        # Unregister user
        for player in PLAYERS:
            if player.connection == websocket.id:
                PLAYERS.remove(player)
                break

        USERS.remove(websocket)
        websockets.broadcast(USERS, json.dumps({"type": "players", "users": getPlayers()}))
        

async def main():
    # Set the stop condition when receiving SIGTERM.
    loop = asyncio.get_running_loop()
    stop = loop.create_future()
    loop.add_signal_handler(signal.SIGTERM, stop.set_result, None)

    port = int(os.environ.get("PORT", "5678"))
    print(f"Starting server on port ", port)
    async with websockets.serve(
            handler,
            host="",
            port=port,
        ):
        await stop


if __name__ == "__main__":
    asyncio.run(main())