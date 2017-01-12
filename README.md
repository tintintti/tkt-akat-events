Event registration system for tkt-akat.

https://tkt-akat-events.herokuapp.com/

####Running locally
- .env file with the mongodb uri at the root
- `npm run install-dev`
- `npm start`

####TODO:
- removing participants (front)
- authentication & login
    - participants get a password/token in email so they can edit or cancel their registration
- mailgun
    - email to participant when they register
    - email to participant who gets to attend from the queue when someone cancels
