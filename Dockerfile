FROM java:8-jdk
RUN mkdir /app
workdir /app
COPY target/DockerDemo-0.0.1-SNAPSHOT.jar /app
EXPOSE 8110

ENTRYPOINT ["java" , "-jar" , "DockerDemo-0.0.1-SNAPSHOT.jar"]