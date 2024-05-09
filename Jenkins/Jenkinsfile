pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
                sh 'echo "This is Build stage."'
                build 'PES1UG21CS127-1'
                sh 'g++ main.cpp -o output'
            }
        }
        stage('Test') { 
            steps {
                sh 'echo "This is Test stage."' 
                sh './output'

            }
        }
        stage('Deploy') { 
            steps {
                sh 'echo "This is Deploy stage."' 
                sh 'echo "Deployment Success" '
            }
        }
    }
    post{
        failure{
            error 'Pipeline Failed'
        }
    }
}