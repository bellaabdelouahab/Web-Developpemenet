from App.models import Package
import smtplib
from email.message import EmailMessage
def searchbase(a,b): 
        if a=='id':
            return Package.query.filter_by(id=b).all()
        elif a=='worker_id':
            return Package.query.filter_by(worker_id=b).all()
        elif a=='sender_full_name':
            return Package.query.filter_by(sender_full_name=b).all()
        elif a=='sender_adress':
            return Package.query.filter_by(sender_adress=b).all()
        elif a=='sender_cin':
            return Package.query.filter_by(sender_cin=b).all()
        elif a=='sender_phonenumber':
            return Package.query.filter_by(sender_phonenumber=b).all()
        elif a=='Receiver_full_name':
            return Package.query.filter_by(Receiver_full_name=b).all()
        elif a=='Receiver_adress':
            return Package.query.filter_by(Receiver_adress=b).all()
        elif a=='Receiver_cin':
            return Package.query.filter_by(Receiver_cin=b).all()
        elif a=='Receiver_phonenumber':
            return Package.query.filter_by(Receiver_phonenumber=b).all()
        elif a=='package_date':
            return Package.query.filter_by(package_date=b).all()
        else:
            return False

def send_email(email_,message_):
    try:
        server = smtplib.SMTP("smtp.gmail.com",587)
    except  :
        return True
    server.starttls()
    server.login('Y.ghazali1693@gmail.com','ghazali1478')
    msg = EmailMessage()
    msg.set_content(message_)
    msg['Subject']='Password reset'
    msg['From']='Y.ghazali1693@gmail.com'
    msg['To']=email_
    server.sendmail('Y.ghazali1693@gmail.com',email_,msg.as_string())
    server.quit()
    print('dfgfg')