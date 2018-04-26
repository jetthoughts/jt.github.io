# git config --global user.name "${CIRCLE_PROJECT_USERNAME}"
# git config --global user.email "${CIRCLE_PROJECT_USERNAME}@${CIRCLE_PROJECT_USERNAME}"
# git checkout -b deploy
# git add -f _site/
# git commit -a -m "Deploy"
# git checkout master
# git checkout deploy _site/**
#   - rsync -av _site/ .
#   - rm -rf _site
# git add . && git commit -a -m "Deploy ${CIRCLE_BUILD_NUM}" && git push origin master
