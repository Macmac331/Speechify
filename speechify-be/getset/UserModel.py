class UserData:
    def __init__(self, firstname, lastname, username, password):
        self._firstname = firstname
        self._lastname = lastname
        self._username = username
        self._password = password

    @property
    def firstname(self):
        return self._firstname
    
    @firstname.setter
    def setFirstname(self, value):
        self._firstname = value

    @property
    def lastname(self):
        return self._lastname
    
    @lastname.setter
    def setLastname(self, value):
        self._lastname = value

    @property
    def username(self):
        return self._username
    @username.setter
    def setUsername (self, value):
        self._username = value
    
    @property
    def password(self):
        return self._password
    
    @password.setter
    def setUsername (self, value):
        self._password = value

