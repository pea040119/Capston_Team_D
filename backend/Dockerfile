
FROM python:3.9-slim

WORKDIR /app

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./

#RUN python manage.py migrate

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

EXPOSE 8000
