pipeline {
  agent any
      stage("Build Backend"){
      steps{
        dir("gym-website-backend"){
        sh "npm install"
        sh "npm run build"
        }
        //sh "docker-compose --env-file Config/Test.env build api"
      }
    }

          stage("Build Frontend"){
          steps{
            dir("gym-website-frontend"){
              sh "npm update"
              sh "ng build --prod"
            }
          }
        }
/*
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
*/
  }
