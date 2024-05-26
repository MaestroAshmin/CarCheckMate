# CarCheckMate
## Installation <a name="installation"></a>

### Prerequisites

#### Node.js and NPM

1. **Download Node.js:**
   - Visit the official Node.js website and download the appropriate installer for your operating system (Windows, macOS, or Linux).
  
2. **Install Node.js:**
   - Follow the installation instructions provided by the installer. This will also install npm (Node Package Manager) alongside Node.js.
  
3. **Verify Installation:**
   - Open the terminal or command prompt and type the following commands to verify that Node.js and npm are installed correctly:
     ```
     node -v
     npm -v
     ```

#### React

1. **Install Create React App:**
   - Before proceeding verify whether NPM has been installed or not. Open the terminal or command prompt and run the following command to install Create React App globally:
     ```
     npm install -g create-react-app
     ```

#### Git

1. **Download Git:**
   - Go to the official Git website and download the installer for your operating system.
  
2. **Install Git:**
   - Follow the installation instructions provided by the installer.
  
3. **Verify Installation:**
   - Open your terminal or command prompt and type the following command to verify that Git is installed correctly:
     ```
     git --version
     ```

#### MongoDB Compass

1. **Download MongoDB Compass:**
   - Visit the MongoDB Compass download page and download the installer for your operating system.
  
2. **Install MongoDB Compass:**
   - Follow the installation instructions provided by the installer.
  
3. **Verify Installation:**
   - Open MongoDB Compass after installation to ensure it launches without any issues.

#### Integrated Development Environment (optional but recommended)

- Install any IDE according to preference.

### Steps

1. **Open terminal or Command Prompt to proceed.**
2. **Clone the CarCheckMate repository from GitHub:**
git clone https://github.com/MaestroAshmin/CarCheckMate.git
Or download the zip file from the repository and unzip it.

3. **Navigate to the project directory:**
cd CarCheckMate


4. **Switch Branch:**
- The latest and final features are available in the following branch.
git checkout jay_new


5. **Install the required NodeJS dependencies:**
npm install


If there are any errors during installation, use the following:
npm install --legacy-peer-deps


6. **Navigate to the folder that has frontend files:**
cd car-checkmate-frontend


7. **Install the required dependencies:**
npm install


8. **Navigate to the root folder:**
cd ..


9. **Run the backend server:**
node index.js


- The backend server runs on port 3000.
10. **Open a new terminal window or command prompt and navigate to the frontend folder:**
 ```
 cd car-checkmate-frontend
 ```
11. **Start the frontend server:**
 ```
 npm start
 ```
 - Enter ‘Y’ when asked to start the server on a new port.
 - The default port for React is usually 3000. However, since the backend server runs on port 3000, the frontend has been configured to run on port 3001.
12. **The project should be up and running. If the project does not start automatically, open a browser and enter the URL.**
   
1. Architecture
![Architecutre](https://github.com/MaestroAshmin/CarCheckMate/assets/132564788/d564acca-7040-4c9c-95e7-2793d496a51d)
