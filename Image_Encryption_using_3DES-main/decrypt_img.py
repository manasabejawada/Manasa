
import subprocess, os, platform
from Crypto.Cipher import DES3
import hashlib
import secrets
import string
from tkinter import filedialog
import sys

try:
    import Tkinter as tk
except ImportError:
    import tkinter as tk

try:
    import ttk
    py3 = False
except ImportError:
    import tkinter.ttk as ttk
    py3 = True

import decrypt_img_support

def vp_start_gui():
    '''Starting point when module is the main routine.'''
    global val, w, root
    root = tk.Tk()
    decrypt_img_support.set_Tk_var()
    top = Toplevel1 (root)
    decrypt_img_support.init(root, top)
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
    decrypt_img_support.init(w, top, *args, **kwargs)
    return (w, top)

def destroy_Toplevel1():
    global w
    w.destroy()
    w = None

class Toplevel1:
    def decrypt(self):
    	key = self.Entry1.get()    	
    	if len(self.Text1.get("1.0", "end-1c")) == 0:
    		self.Label1.configure(text="Select a file to proceed", fg = "red")
    	elif len(key) != 16 :
    		self.Label3.configure(text="Please enter a valid key of length 16 bits", fg="red")
    	else:
    		self.Label3.configure(text="")
    		filename=self.Text1.get("1.0", "end-1c")
    		ext=filename.rsplit('.')
    		# open text file with encrypted data
    		fp = open(filename, "rb")
    		data = fp.read()
    		fp.close()
    		
    		# removing hash of from data for integrity check
    		hashcode=data[-64:]
    		
    		#decryption process
    		cipherkey = DES3.new(key,mode=DES3.MODE_ECB)
    		plaintext = cipherkey.decrypt(data[:-73])
    		
    		#calulating the hash of decrypted file
    		res = hashlib.sha256(plaintext)
    		
    		#verify hashes of files to verify integrity
    		if res.hexdigest()==str(hashcode.decode()):
    			#print("Verified")
    			# writing file only is hash is verified
    			f = open(ext[0]+"_decrypted"+"."+ext[1], "wb")
    			f.write(plaintext)
    			f.close()
    			msg="The File has been decryted successfully.\nThe integrity check of the file has passed. The file is at the location:"+os.getcwd()+"\n\nDo you want to open the file?"
    			result =tk.messagebox.askquestion("Decryption successful", msg)
    			if result == 'yes':
    				subprocess.call(('xdg-open', ext[0]+"_decrypted"+"."+ext[1]))
    				root.destroy()
    			else:
    				root.destroy()
    		else:
    			msg="Please enter a valid key!"
    			result =tk.messagebox.showerror("Error", msg)
    			

    		
    		
    def browse(self):
    	filename = filedialog.askopenfilename(parent=root, initialdir = "/", title = "Select a File", filetypes = (("Image files","*.jpg"),("Image files", "*png"), ("Image files", "*jpeg")))
    	self.Label1.configure(text="File opened", fg="black")
    	self.Text1.insert(tk.END, filename)
    	
    def __init__(self, top=None):
        '''This class configures and populates the toplevel window.
           top is the toplevel containing window.'''
        _bgcolor = '#d9d9d9'  # X11 color: 'gray85'
        _fgcolor = '#000000'  # X11 color: 'black'
        _compcolor = '#d9d9d9' # X11 color: 'gray85'
        _ana1color = '#d9d9d9' # X11 color: 'gray85'
        _ana2color = '#ececec' # Closest X11 color: 'gray92'

        top.geometry("600x450+660+145")
        top.minsize(600, 450)
        top.maxsize(600, 450)
        top.resizable(1,  1)
        top.title("Decryption")
        top.configure(background="#ffffff")
        top.configure(padx="10")
        top.configure(pady="10")

        self.Text1 = tk.Text(top)
        self.Text1.place(relx=0.117, rely=0.244, relheight=0.076, relwidth=0.577)

        self.Text1.configure(background="white")
        self.Text1.configure(font="TkTextFont")
        self.Text1.configure(selectbackground="blue")
        self.Text1.configure(selectforeground="white")
        self.Text1.configure(wrap="word")

        self.Button1 = tk.Button(top)
        self.Button1.place(relx=0.717, rely=0.244, height=33, width=113)
        self.Button1.configure(borderwidth="2")
        self.Button1.configure(cursor="hand2")
        self.Button1.configure(text='''Browse''')
        self.Button1.configure(command=self.browse)

        self.Label1 = tk.Label(top)
        self.Label1.place(relx=0.117, rely=0.178, height=21, width=249)
        self.Label1.configure(activebackground="#ffffff")
        self.Label1.configure(anchor='w')
        self.Label1.configure(background="#ffffff")
        self.Label1.configure(font="-family {DejaVu Sans} -size 11")
        self.Label1.configure(justify='left')
        self.Label1.configure(text='''Choose file for decryption''')

        #self.menubar = tk.Menu(top,font="TkMenuFont",bg=_bgcolor,fg=_fgcolor)
        #top.configure(menu = self.menubar)

        self.Entry1 = tk.Entry(top)
        self.Entry1.place(relx=0.117, rely=0.489, height=33, relwidth=0.777)
        self.Entry1.configure(background="white")
        self.Entry1.configure(font="TkFixedFont")
        #self.Entry1.configure(textvariable=decrypt_img_support.key_var)

        self.Label2 = tk.Label(top)
        self.Label2.place(relx=0.117, rely=0.422, height=21, width=319)
        self.Label2.configure(activebackground="#ffffff")
        self.Label2.configure(anchor='w')
        self.Label2.configure(background="#ffffff")
        self.Label2.configure(cursor="fleur")
        self.Label2.configure(disabledforeground="#dddddd")
        self.Label2.configure(font="-family {DejaVu Sans} -size 11")
        self.Label2.configure(text='''Enter the secret key''')

        self.Button2 = tk.Button(top)
        self.Button2.place(relx=0.35, rely=0.711, height=43, width=193)
        self.Button2.configure(activebackground="#3f99e8")
        self.Button2.configure(activeforeground="#ffffff")
        self.Button2.configure(background="#3f6ce8")
        self.Button2.configure(borderwidth="2")
        self.Button2.configure(cursor="hand2")
        self.Button2.configure(font="-family {DejaVu Sans} -size 12")
        self.Button2.configure(foreground="#ffffff")
        self.Button2.configure(highlightcolor="#ffffff")
        self.Button2.configure(text='''Decrypt''')
        self.Button2.configure(command= self.decrypt)

        self.Label3 = tk.Label(top)
        self.Label3.place(relx=0.117, rely=0.578, height=21, width=469)
        self.Label3.configure(activebackground="#ffffff")
        self.Label3.configure(anchor='w')
        self.Label3.configure(background="#ffffff")

if __name__ == '__main__':
    vp_start_gui()





