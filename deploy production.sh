#!/bin/bash

# This script is used to deploy the application to the production environment.

# Swap the environment files to use the production configuration
echo "Swapping environment files to use production configuration"
mv '0. env.js' '0. env.development'
mv '0. env.production' '0. env.js'
mv '.clasp.json' '.clasp.development'
mv '.clasp.production' '.clasp.json'

echo "Pushing changes to the production environment"
clasp push

# Uncomment the following line if you want to deploy using a specific deployment ID
# clasp deploy --deploymentId xxx

# Swap the environment files back to use the development configuration
echo "Swapping environment files back to use development configuration"
mv '0. env.js' '0. env.production'
mv '0. env.development' '0. env.js'
mv '.clasp.json' '.clasp.production'
mv '.clasp.development' '.clasp.json'
