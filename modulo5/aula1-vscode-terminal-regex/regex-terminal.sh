# a partir da pasta raiz
find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt
find . -name *.js -not -path '*node_modules**' | ipt

# volta para a pasta do modulo5
cp -r ../../modulo1/aula05-tdd-project-pt01 .

CONTENT="'use strict';"
find . -name *.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e "1s/^/\'$CONTENT'\ \n/g" {file}


# 1s -> primeira linha
# ^-> primeira coluna
# substitui pelo $CONTENT
# quebra a linha para adicionar um \n implicito

# muda tudo!
CONTENT="'use strict';"
find . -name *.js -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "" -e "1s/^/\'$CONTENT'\ \n/g" {file}