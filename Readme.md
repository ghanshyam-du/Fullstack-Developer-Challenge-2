Basic setup to run this project locally 


FOR FRONTEND (create .env file)-

VITE_BASE_URL - your backend url (through which the server listens for requests) 
to test it locally use (http://localhost:5000/api)

FOR BACKEND (create .env file) - 

PORT = 5000 (at which the backend is running)
MONGO_URI =  (DB url for the connection for this project i am using mongodb)
JWT_SECRET = Ghanshyam@12 (it is jwt secret key)

to run it locally DB_url  is (mongodb+srv://ghanshyamd5402_db_user:saxHtNAyMqyni1zT@cluster0.on4v9nr.mongodb.net/Employee_Review_System?retryWrites=true&w=majority&appName=Cluster0)


TO RUN THE PROJECT 

first run the backend - (run on the port number 5000)
  npm run start or npm run dev

then run the frontend - (run on the port number 5173)
  npm run dev 