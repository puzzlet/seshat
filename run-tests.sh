#!/bin/sh

for SESHAT_FILE in ./tests/seshat/*.seshat
do
    OUTPUT=$(node build/lib/seshat.js "$SESHAT_FILE")
    EXPECTED_OUTPUT=$(cat "$SESHAT_FILE.output")
    if [ "$OUTPUT" = "$EXPECTED_OUTPUT" ]
    then
        echo "$SESHAT_FILE success"
    else
        echo "expected output: $EXPECTED_OUTPUT"
        echo "output: $OUTPUT"
        echo "$SESHAT_FILE fail"
        exit 1
    fi
done
