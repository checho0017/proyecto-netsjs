# Practica de despliegue automatizado

Esta práctica consiste en hacer la publicación de un api en NodeJs a partir de un nuevo commit en el repositorio. 

 Se hace uso de:
  * **2 repositorios en github**: el repositorio /proyecto-netsjs contiene el desarrollo de la API en NodeJS y el repositorio de /Charts contiene la configuración del chart helm con toda la configuración de los manifiestos.
  * **Kubernetes**: Utilizado para generar el cluster utilizado.
  * **Cuenta en Digital Ocean**: En esta cuenta almacenamos el cluster(Kubernetes).
  * **Docker**: Utilizado para generar las imágenes de la Api que seran ejecutadas sobre el cluster.
  * **Cuenta en Docker Hub**: En esta cuenta publicamos las imágenes generadas.
  * **ArgoCD**: Utilizado para escuchar los cambios generados en el **chart helm**. Este se encarga de hacer un redespliegue.

## Repositorios

* [Api](https://github.com/checho0017/proyecto-netsjs)
* [ChartsHelm](https://github.com/checho0017/Charts/blob/main/index.yaml)

## Video
* [Video de la practica](https://drive.google.com/file/d/1fjGfW8Zpk_RKdlzQBHiK5LbTbID8h6JG/view?usp=drive_link)

## Integrantes

* Marlon David Garcia 
* Claudia Bojaca
* Sergio Rodriguez