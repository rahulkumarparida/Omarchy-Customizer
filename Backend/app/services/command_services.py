import os
import subprocess

def run_command(cmd):
    result = subprocess.run(
        cmd,
        shell=True,
        capture_output=True,
        text=True
    )
    # print("Result: ",result.stdout)
    print("Error: ",result.stderr)
    return result