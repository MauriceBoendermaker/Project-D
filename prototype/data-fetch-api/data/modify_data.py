import json

path = r"C:\HR\Jaar 2\Semester 4\Project D\Project-D\prototype\data-fetch-api\data\Zending_data.json"

# Read the original JSON file
with open(path, 'r') as file:
    data = json.load(file)

# Modify the data
for datapoint in data:
    datapoint["VehicleId"] += 1

# Write the modified data back to the file
with open(path, 'w') as file:
    json.dump(data, file, indent=4)

print("File updated successfully.")
