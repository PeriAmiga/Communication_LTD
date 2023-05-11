import os
import hashlib
import pbkdf2

# Define a random salt
salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
# Open the file in write mode
with open('salt.txt', 'w') as file:
    # Write the value to the file
    file.write(salt.decode())