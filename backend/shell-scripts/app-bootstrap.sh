#!/bin/bash

echo "use node 18.18.1"
nvm use 18.18.1

echo "check ganache"

# Check if ganache is running
ps aux | grep -i ganache | grep -v grep > /dev/null
if [ $? -eq 0 ]; then
    echo "canache is running"
else
    echo "ganache is not running"
    exit 1
fi

echo "get first signer address"

# this will create a file called signer-address.txt with the first signer address
node ../scripts/get-first-signer-address.js

echo "send 1.5 ETH to account 1 on meta"
# need to check if send-to-meta returns an error
./send-to-meta.sh
if [ $? -eq 0 ]; then
    echo "sent 1.5 ETH to account 1 on meta"
else
    echo "error sending 1.5 ETH to account 1 on meta"
    exit 1
fi

echo "compile contracts"
./compile-pool-circle.sh

echo "deploy contracts"
./deploy-pool-circle-admin-contract.sh

echo "update contract in frontend"
./update-contract.sh