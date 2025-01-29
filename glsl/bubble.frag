
varying vec3 vNormal;

void main() {

    vec3 rgb_normal = vNormal * 0.5 + 0.5; // [-1, 1] -> [0, 1] 
    
    gl_FragColor = vec4(rgb_normal, 1.0);
}