FROM openjdk:8
RUN mkdir /app
WORKDIR /app
COPY target/DockerDemo-0.0.1-SNAPSHOT.jar /app
EXPOSE 8110

ENTRYPOINT ["java" , "-jar" , "DockerDemo-0.0.1-SNAPSHOT.jar"]