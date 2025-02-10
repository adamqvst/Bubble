#define N_DIRLIGHTS 1

struct DirectionalLight {
    vec3 direction;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

uniform DirectionalLight directional_lights[N_DIRLIGHTS];

varying vec3 vNormal;


void main() {

    vec3 view_direction = vec3(0.0, 0.0, 1.0);

    //vec3 rgb_normal = vNormal * 0.5 + 0.5; // [-1, 1] -> [0, 1] 
    vec3 light_direction;
    vec3 ambient_color;
    vec3 diffuse_color;
    vec3 specular_color; 


    vec4 col = vec4(1.0, 1.0, 1.0, 1.0); 

    // Apply lighting for each directional light
    for (int i = 0; i < N_DIRLIGHTS; i++) {

        light_direction = normalize(directional_lights[i].direction);
        ambient_color = directional_lights[i].ambient;
        diffuse_color = directional_lights[i].diffuse;
        specular_color = directional_lights[i].specular;


        // Lambertian diffuse lighting
        col.rgb = ambient_color + diffuse_color * max(dot(light_direction, vNormal), 0.0);

        // Fresnel 
        /*
        float fresnel = 1.0 - clamp(dot(view_direction, vNormal), 0.0, 1.0);
        col.a = fresnel;
        */

        // Blinn-Phong specular reflections
        vec3 half_vector = normalize(view_direction + light_direction);
        float specular = pow(abs(clamp(dot(half_vector, vNormal), 0.0, 1.0)), 30.0);

        // Adding weaker specular reflections to simulate light hitting the bubbles back hemisphere
        vec3 reflected_normal = reflect(-view_direction, vNormal);
        float specular_back_hemisphere = pow(abs(clamp(dot(half_vector, reflected_normal), 0.0, 1.0)), 30.0);

        //col.rgb += specular * specular_color;
        col.rgb += specular_back_hemisphere * specular_color;
        col.a += specular;
    }

    gl_FragColor = vec4(col);
}