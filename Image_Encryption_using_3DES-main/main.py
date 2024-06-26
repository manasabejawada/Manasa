

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

import main_support

def vp_start_gui():
    '''Starting point when module is the main routine.'''
    global val, w, root
    root = tk.Tk()
    top = Toplevel1 (root)
    main_support.init(root, top)
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
    main_support.init(w, top, *args, **kwargs)
    return (w, top)

def destroy_Toplevel1():
    global w
    w.destroy()
    w = None

class Toplevel1:
    def encrypt(self):
    	import encrypt_img
    	encrypt_img.vp_start_gui()
    
    def decrypt(self):
    	import decrypt_img
    	decrypt_img.vp_start_gui()
    	
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
        top.title("Home")
        top.configure(background="#ffffff")
        top.configure(highlightcolor="black")

        self.Frame1 = tk.Frame(top)
        self.Frame1.place(relx=0.083, rely=0.222, relheight=0.211
                , relwidth=0.833)
        self.Frame1.configure(relief='groove')
        self.Frame1.configure(borderwidth="2")
        self.Frame1.configure(relief="groove")
        self.Frame1.configure(background="#ffffff")

        self.Button1 = tk.Button(self.Frame1)
        self.Button1.place(relx=0.74, rely=0.316, height=33, width=113)
        self.Button1.configure(activebackground="#3f99e8")
        self.Button1.configure(activeforeground="#ffffff")
        self.Button1.configure(background="#3f6ce8")
        self.Button1.configure(borderwidth="2")
        self.Button1.configure(foreground="#ffffff")
        self.Button1.configure(text='''Encrypt''')
        self.Button1.configure(command=self.encrypt)

        self.Message1 = tk.Message(self.Frame1)
        self.Message1.place(relx=0.04, rely=0.105, relheight=0.789
                , relwidth=0.624)
        self.Message1.configure(background="#ffffff")
        self.Message1.configure(cursor="fleur")
        self.Message1.configure(text='''Click 'Encrypt' button to perform encryption of an image file using the triple DES algorithm and generate the secret key''')
        self.Message1.configure(width=312)

        self.Frame2 = tk.Frame(top)
        self.Frame2.place(relx=0.083, rely=0.578, relheight=0.211
                , relwidth=0.833)
        self.Frame2.configure(relief='groove')
        self.Frame2.configure(borderwidth="2")
        self.Frame2.configure(relief="groove")
        self.Frame2.configure(background="#ffffff")

        self.Button2 = tk.Button(self.Frame2)
        self.Button2.place(relx=0.74, rely=0.316, height=33, width=113)
        self.Button2.configure(activebackground="#3f99e8")
        self.Button2.configure(activeforeground="#ffffff")
        self.Button2.configure(background="#3f6ce8")
        self.Button2.configure(borderwidth="2")
        self.Button2.configure(foreground="#ffffff")
        self.Button2.configure(text='''Decrypt''')
        self.Button2.configure(command=self.decrypt)

        self.Message2 = tk.Message(self.Frame2)
        self.Message2.place(relx=0.04, rely=0.105, relheight=0.789
                , relwidth=0.644)
        self.Message2.configure(background="#ffffff")
        self.Message2.configure(text='''Click 'Decrypt' button to perform decryption of the encrypted image file using the secret key. This application also perform integrity check of the decrypted file.''')
        self.Message2.configure(width=322)

        self.Message3 = tk.Message(top)
        self.Message3.place(relx=0.083, rely=0.111, relheight=0.056
                , relwidth=0.587)
        self.Message3.configure(anchor='w')
        self.Message3.configure(background="#ffffff")
        self.Message3.configure(font="-family {DejaVu Sans} -size 11 -weight bold")
        self.Message3.configure(text='''Choose the task to be performed:''')
        self.Message3.configure(width=352)

if __name__ == '__main__':
    vp_start_gui()





