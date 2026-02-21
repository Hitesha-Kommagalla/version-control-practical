pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Cloning GitHub repository...'
                git branch: 'main', url: 'https://github.com/Hitesha-Kommagalla/version-control-practical.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                echo 'Installing backend dependencies...'
                bat 'npm install'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                echo 'Installing frontend dependencies...'
                bat 'cd frontend && npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Building frontend...'
                bat 'cd frontend && npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests (if available)...'
                // sh 'npm test'
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check console output.'
        }
    }
}
