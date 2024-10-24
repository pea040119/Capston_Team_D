import mysql.connector
from mysql.connector import Error

try:
    # 데이터베이스에 연결
    connection = mysql.connector.connect(
        host='localhost',
        database='your_database',
        user='your_username',
        password='your_password'
    )

    if connection.is_connected():
        db_info = connection.get_server_info()
        print("MySQL 서버 버전:", db_info)
        cursor = connection.cursor()
        cursor.execute("SELECT DATABASE();")
        record = cursor.fetchone()
        print("연결된 데이터베이스:", record)

except Error as e:
    print("오류 발생:", e)

finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL 연결이 종료되었습니다.")
