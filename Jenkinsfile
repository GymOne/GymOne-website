pipeline {
  agent any

  triggers {
    pollSCM("H/5 * * * *")
  }

  stages{
      stage("Build Backend"){
                  when {
            changeset "gym-website-backend/**"
          }
          steps{
        dir("gym-website-backend"){
        sh "npm install"
        sh "npm run build"
        }
        sh "docker-compose --env-file Config/Test.env build api"
      }
    }

      stage("Build Frontend"){
          when {
            changeset "gym-website-frontend/**"
          }
          steps{
            dir("gym-website-frontend"){
              sh "npm update --force"
              sh "ng build --prod"
            }
            sh "docker-compose --env-file Config/Test.env build web"
          }
        }

      stage("Clean containers") {
          steps {
                script {
                    try {
                        sh "docker-compose --env-file Config/Test.env down"
                    }
                    finally { }
                }
            }
        }

      stage("Deploy") {
          steps{
            sh "docker-compose --env-file Config/Test.env up -d"
          }
          }

      stage("Push to registry"){
          steps{
            sh "docker-compose --env-file Config/Test.env push"
          }
          }
  }
}
