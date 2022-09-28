pipeline {
    agent none
    stages {
        stage ('npm install'){
            agent { label 'node110' }
            when {
                branch 'main'
            }
            steps {
                sh 'npm install'
            }
            post {
                success {
                    echo "npm installation complete"
                }
            }
        }
        stage ('Build Angular App'){
            agent { label 'node110'}
            when {
                branch 'main'
            }
            steps {
                sh 'node_modules/.bin/ng build --prod'
                stash includes: 'dist/momLife-admin-panel/', name:'app'
            }
        }
        stage ('Serve Frontend'){
            agent {  label  'node110' }
            when {
                branch 'main'
            }
            steps {
                unstash 'app'
                sh 'rm -rf /root/mom-production/admin'
                sh 'cp -rf dist/momLife-admin-panel/ /root/mom-production/admin'
                sh 'cd /root/mom-production/ &&  docker-compose build --no-cache && docker-compose up -d --force-recreate'
            }
            post {
                success {
                    echo "Success"
                }
            }
        }

        //  stage ('npm install - Production'){
        //      agent { label 'node110' }
        //      when {
        //          branch 'live'
        //      }
        //      steps {
        //          echo '> install Angular dependencies '
        //          sh 'npm install'
        //      }
        //      post {
        //          success {
        //              echo "npm installation complete"
        //          }
        //      }
        //  }

        //  stage ('Build Angular App - Production'){
        //      agent { label 'node110'}
        //      when {
        //          branch 'live'
        //      }
        //      steps {
        //          echo '> Build Angular App For Production'
        //          sh 'node_modules/.bin/ng build --prod --source-map=false --output-path mng-admin --base-href /mng-admin/'
        //          stash includes: 'mng-admin/', name:'app'
        //      }
        //  }
        //  stage ('Serve Frontend - Production'){
        //      agent {  label  'live' }
        //      when {
        //          branch 'live'
        //      }
        //      steps {
        //          input('Do you want to Deploy !?')
        //          echo "> unstash build artifact ..."
        //          unstash 'app'
        //          echo "> Deployment Process Started ..."
        //      }
        //      post {
        //          success {
        //             script {
        //                 def userInput = input(id: 'userInput', message: 'Specify current version',
        //                 parameters: [[$class: 'StringParameterDefinition', defaultValue: '3.1.1',
        //                     description:'version controling', name:'version']
        //                 ])
        //                 println(userInput);
        //                 environment {
        //                         version = '$userInput'
        //                 }
        //                 withEnv(["version=$userInput"]) {
        //                         sh 'ansible-playbook /home/ubuntu/webConfigs/configs/configs/version.yaml -e version=$version'
        //                 }
        //                 sh 'sudo rm -rf /var/www/html/mng-admin'
        //                 sh 'sudo cp -rf ./mng-admin /var/www/html/'
        //                 sh 'cd /home/ubuntu/webConfigs/configs/ && ./vh-config-copy.sh'
        //                 sh 'sudo systemctl restart nginx'
        //             }
        //          }
        //      }
        //  }

    }
}
