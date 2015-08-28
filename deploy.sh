    #!/bin/bash
    # Any command that using GH_OAUTH_TOKEN must pipe the output to /dev/null to not expose your oauth token
    echo 'submodule'
    echo ${GH_OWNER}
    
ls
    git submodule add -b gh-pages https://${GH_OAUTH_TOKEN}@github.com/${GH_OWNER}/${GH_PROJECT_NAME} site 
    ls

     cd scripts/site
     echo 'checkout'
     if git checkout gh-pages; then git checkout -b gh-pages; fi
     git rm -r .
     cp -R ../dist/* .
     cp ../dist/.* .
     echo 'add'
     git add -f .
     echo 'ls'
     ls -al

     git config user.email "franziska.hinkelmann@gmail.com"
     git config user.name "Franziska Hinkelmann"
     echo 'commit'
     git commit -am "Deploy to gh-pages [ci skip]"
    # Any command that using GH_OAUTH_TOKEN must pipe the output to /dev/null to not expose your oauth token
     git push https://${GH_OAUTH_TOKEN}@github.com/${GH_OWNER}/${GH_PROJECT_NAME} HEAD:gh-pages 
