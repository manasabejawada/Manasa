
from Crypto.Cipher import DES3
import hashlib
import string
import secrets

import pyperclip
from tkinter import filedialog
import sys

try:
    import Tkinter as tk
except ImportError:
    import tkinter as tk
    from tkinter import messagebox

try:
    import ttk
    py3 = False
except ImportError:
    import tkinter.ttk as ttk
    py3 = True

import encrypt_img_support

def vp_start_gui():
    '''Starting point when module is the main routine.'''
    global val, w, root
    root = tk.Tk()
    top = Toplevel1 (root)
    encrypt_img_support.init(root, top)
    root.mainloop()

w = None
def create_Toplevel1(rt, *args, **kwargs):
    '''Starting point when module is imported by another module.
       Correct form of call: 'create_Toplevel1(root, *args, **kwargs)' .'''
    global w, w_win, root
    #rt = root
    root = rt
    w = tk.Toplevel (root)
    top = Toplevel1 (w)
    encrypt_img_support.init(w, top, *args, **kwargs)
    return (w, top)

def destroy_Toplevel1():
    global w
    w.destroy()
    w = None

class Toplevel1:	
    def encrypt_img(self):
    	if len(self.Text1.get("1.0", "end-1c")) == 0:
    		self.Label1.configure(text="Choose an image file to proceed", fg="red")
    	else:
	    	filename=self.Text1.get("1.0", "end-1c")
	    	ext=filename.rsplit('.')
	    	#open image file to be read
	    	fp = open(filename, 'rb')
	    	data  = fp.read()
	    	fp.close()
	    	
	    	#encrpytion key length should 16bits
	    	alphabet = string.ascii_letters + string.digits
	    	key="".join(secrets.choice(alphabet) for i in range(16))
	    	#print(f"Your encryption key is {key}. Share this to decrypt the file.")
	    	
	    	#starting encryption
	    	BLOCK_SIZE = 8
	    	padding = "@"
	    	padding = bytearray(padding.encode())
	    	data = data + ((BLOCK_SIZE - len(data)) % BLOCK_SIZE) * padding
	    	cipherkey = DES3.new(key,mode=DES3.MODE_ECB)
	    	ciphertext = cipherkey.encrypt(data) 
	    	
	    	# writing ecnrypted data to text file
	    	f = open(ext[0]+"_encrypted"+"."+ext[1], 'wb')
	    	f.write(ciphertext)
	    	f.close()
	    	
	    	# calculating hash and appending in text file for integrity check while decoding
	    	res = hashlib.sha256(data)
	    	f = open(ext[0]+"_encrypted"+"."+ext[1], 'a+')
	    	f.write("&&hashIs="+str(res.hexdigest()))
	    	f.close()
	    	
	    	msg="The Cipher Key is : "+ key +"\nCopy Key to Clipboard?"
	    	result = tk.messagebox.askquestion("Encryption Successful",msg)
	    	if result == 'yes':
	    		pyperclip.copy(key)
	    		spam = pyperclip.paste()
	    		root.destroy()
	    	else:
	    		root.destroy()
    	   
    
    def browse_file(self):	
    	filename = filedialog.askopenfilename(parent=root, initialdir = "/", title = "Select a File", filetypes = (("Image files","*.jpg"),("Image files", "*png"), ("Image files", "*jpeg")))
    	self.Label1.configure(text="File opened", fg="blue")
    	self.Text1.insert(tk.END, filename)

    	
    def __init__(self, top=None):
        '''This class configures and populates the toplevel window.
           top is the toplevel containing window.'''
        _bgcolor = '#d9d9d9'  # X11 color: 'gray85'
        _fgcolor = '#000000'  # X11 color: 'black'
        _compcolor = '#d9d9d9' # X11 color: 'gray85'
        _ana1color = '#d9d9d9' # X11 color: 'gray85'
        _ana2color = '#ececec' # Closest X11 color: 'gray92'

        top.geometry("600x450+659+146")
        top.minsize(600, 450)
        top.maxsize(600, 450)
        top.resizable(1,  1)
        top.title("Image Encryption")
        top.configure(background="#ffffff")
        top.configure(padx="10")
        top.configure(pady="10")
        top.configure(highlightcolor="black")

        self.Button1 = tk.Button(top)
        self.Button1.place(relx=0.317, rely=0.533, height=43, width=103)
        self.Button1.configure(activebackground="#3f99e8")
        self.Button1.configure(activeforeground="#ffffff")
        self.Button1.configure(background="#3f6ce8")
        self.Button1.configure(borderwidth="2")
        self.Button1.configure(cursor="hand2")
        self.Button1.configure(font="-family {DejaVu Sans} -size 12")
        self.Button1.configure(foreground="#ffffff")
        self.Button1.configure(highlightcolor="#ffffff")
        self.Button1.configure(text='''Encrypt''')
        self.Button1.configure(command=self.encrypt_img)

        self.Button2 = tk.Button(top)
        self.Button2.place(relx=0.667, rely=0.267, height=33, width=113)
        self.Button2.configure(borderwidth="2")
        self.Button2.configure(cursor="hand2")
        self.Button2.configure(text='''Browse File''')
        self.Button2.configure(command=self.browse_file)

        self.Label1 = tk.Label(top)
        self.Label1.place(relx=0.1, rely=0.2, height=21, width=289)
        self.Label1.configure(activebackground="#ffffff")
        self.Label1.configure(anchor='w')
        self.Label1.configure(background="#ffffff")
        self.Label1.configure(text='''Choose file (jpeg, jpg, png)''')

        self.Text1 = tk.Text(top)
        self.Text1.place(relx=0.083, rely=0.267, relheight=0.076, relwidth=0.527)

        self.Text1.configure(background="white")
        self.Text1.configure(font="TkTextFont")
        self.Text1.configure(selectbackground="blue")
        self.Text1.configure(selectforeground="white")
        self.Text1.configure(wrap="word")
        
        self.Label2 = tk.Label(top)
        self.Label2.place(relx=0.117, rely=0.356, height=21, width=39)
        self.Label2.configure(activebackground="#ffffff")
        self.Label2.configure(anchor='w')
        self.Label2.configure(background="#ffffff")
        self.Label2.configure(text='')

if __name__ == '__main__':
    vp_start_gui()





