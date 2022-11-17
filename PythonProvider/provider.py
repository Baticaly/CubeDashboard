import asyncio
import socketio
import board
import adafruit_mpu6050
import time
import json

i2c = board.I2C()
mpu = adafruit_mpu6050.MPU6050(i2c)
sio = socketio.Client()

@sio.event
def connect():
    print('connection established')
    sio.emit('set-provider')

@sio.event
def my_message(data):
    print('message received with ', data)
    sio.emit('my response', {'response': 'my response'})

@sio.event
def disconnect():
    print('disconnected from server')

sio.connect('http://localhost:3000')

while True:
    raw = { "x": mpu.gyro[0], "y": mpu.gyro[1], "z": mpu.gyro[2] }
    payload = json.dumps(raw)

    print(payload)
    sio.emit('payload', payload)
    time.sleep(.1)