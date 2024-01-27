from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Game(db.Model):
    """
    Game Model 
    """
    __tablename__ = "game"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    summary = db.Column(db.String, nullable=False)

    def __init__(self, **kwargs):
        """
        Initialize a Game Object 
        """
        self.name = kwargs.get("name", "")
        self.summary = kwargs.get("summary", "")
    
class SummaryFlag(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    is_summary_done = db.Column(db.Boolean, default = False)