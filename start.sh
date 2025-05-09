#!/bin/bash

echo "Starting backend..."
(cd backend && pnpm run start:dev) &

echo "Starting frontend..."
(cd frontend && pnpm run dev) &

wait

# ./start.sh

