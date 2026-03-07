import os

def store_data(data, filename):
    import json
    filepath = os.path.join(os.getcwd(), "omarchy_dumps", filename)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w") as f:
        json.dump(data, f, indent=4)

