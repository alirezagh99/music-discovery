"use client";

import { useEffect, useRef } from "react";
// import p5 from "p5";

export const AudioFingerprintAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    import("p5").then((p5Module) => {
      const p5 = p5Module.default;

      const sketch = (p: any) => {
        let paths: any = [];
        let framesBetweenParticles = 2;
        let nextParticleFrame = 0;
        let previousParticlePosition: any;
        let particleFadeFrames = 400;

        p.setup = () => {
          const width = containerRef.current!.clientWidth;
          const height = containerRef.current!.clientHeight;
          p.createCanvas(width, height);
          p.colorMode(p.HSB);
          previousParticlePosition = p.createVector(50, 50);
          paths.push(new Path());
          createParticle();
        };

        p.draw = () => {
          p.background("#fffbe6");

          if (p.frameCount >= nextParticleFrame) {
            createParticle();
          }
          for (let path of paths) {
            path.update();
            path.display();
          }
        };

        //   p.mousePressed = () => {
        //     nextParticleFrame = p.frameCount;

        //     paths.push(new Path());

        //     previousParticlePosition.set(p.mouseX, p.mouseY);

        //     createParticle();
        //   };

        //   p.mouseDragged = () => {
        //     if (p.frameCount >= nextParticleFrame) {
        //       createParticle();
        //     }
        //   };

        function createParticle() {
          let x = p.frameCount;

          let y = p.height / 2 + Math.sin(x * 0.05) * 100;

          let position = p.createVector(x % p.width, y);

          let velocity = p5.Vector.sub(position, previousParticlePosition);

          velocity.mult(0.05);

          let lastPath = paths[paths.length - 1];

          lastPath.addParticle(position, velocity);

          nextParticleFrame = p.frameCount + framesBetweenParticles;

          previousParticlePosition.set(position.x, position.y);
        }

        class Path {
          constructor() {
            this.particles = [];
          }

          addParticle(position: any, velocity: any) {
            // Add a new particle with a position, velocity, and hue
            let particleHue = (5 * 30) % 360;
            this.particles.push(new Particle(position, velocity, particleHue));
          }

          // Update all particles
          update() {
            for (let particle of this.particles) {
              particle.update();
            }
          }

          // Draw a line between two particles
          connectParticles(particleA: any, particleB: any) {
            let opacity = particleA.framesRemaining / particleFadeFrames;
            p.stroke(255, opacity);
            p.line(
              particleA.position.x,
              particleA.position.y,
              particleB.position.x,
              particleB.position.y,
            );
          }

          // Display path
          display() {
            // Loop through backwards so that when a particle is removed,
            // the index number for the next loop will match up with the
            // particle before the removed one
            for (let i = this.particles.length - 1; i >= 0; i -= 1) {
              // Remove this particle if it has no frames remaining
              if (this.particles[i].framesRemaining <= 0) {
                this.particles.splice(i, 1);

                // Otherwise, display it
              } else {
                this.particles[i].display();

                // If there is a particle after this one
                if (i < this.particles.length - 1) {
                  // Connect them with a line
                  this.connectParticles(
                    this.particles[i],
                    this.particles[i + 1],
                  );
                }
              }
            }
          }
        }

        class Particle {
          constructor(position: any, velocity: any, hue: any) {
            this.position = position.copy();
            this.velocity = velocity.copy();
            this.hue = hue;
            this.drag = 0.95;
            this.framesRemaining = particleFadeFrames;
          }

          update() {
            // Move it
            this.position.add(this.velocity);

            // Slow it down
            this.velocity.mult(this.drag);

            // Fade it out
            this.framesRemaining = this.framesRemaining - 1;
          }

          // Draw particle
          display() {
            let opacity = this.framesRemaining / particleFadeFrames;
            p.noStroke();
            p.fill(this.hue, 80, 90, opacity);
            p.circle(this.position.x, this.position.y, 5);
          }
        }
      };

      const canvas = new p5(sketch, containerRef.current);

      return () => {
        canvas.remove();
      };
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex justify-center overflow-hidden h-[50vh]"
    />
  );
};
