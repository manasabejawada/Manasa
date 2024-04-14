input1 = 'fi_er'
input2 =  'Fever:filer:Filter: Fixer:fiber:fibre:tailor:offer'
words= input2.split(':')
input1= input1.upper()
a=[]
for word in words:
  word=word.strip().upper()
  if len(word)== len(input1):
    k=''
    for i in range(len(word)):
      if word[i]==input1[i] or input1[i]=='_':
        k=k+word[i]
    if word == k:
      a.append(k)
if not a:
  print('error-9090')
print(' '.join(a))