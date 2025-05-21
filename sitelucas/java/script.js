document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // Cursor 3D personalizado
    const cursor3d = document.querySelector('.cursor-3d');
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            cursor3d.style.left = e.clientX + 'px';
            cursor3d.style.top = e.clientY + 'px';
        });
        
        // Efeito hover no cursor
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .magnetic');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursor3d.style.width = '40px';
                cursor3d.style.height = '40px';
                cursor3d.style.backgroundColor = 'var(--secondary-color)';
            });
            
            el.addEventListener('mouseleave', function() {
                cursor3d.style.width = '20px';
                cursor3d.style.height = '20px';
                cursor3d.style.backgroundColor = 'var(--primary-color)';
            });
        });
    }

    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Efeito de scroll no header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Botão voltar ao topo
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animação do título hero
    const titleWords = document.querySelectorAll('.title-word');
    
    titleWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animação ao rolar a página
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.skill-card, .project-card, .about-content, .process-step, .info-card').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });
    
    // Animação dos contadores
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const updateCount = () => {
            const currentCount = +counter.innerText;
            
            if (currentCount < target) {
                counter.innerText = Math.ceil(currentCount + increment);
                setTimeout(updateCount, 16);
            } else {
                counter.innerText = target;
            }
        };
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            onEnter: updateCount,
            once: true
        });
    });
    
    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            const name = document.getElementById('name').value;
            alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve.`);
            
            this.reset();
        });
    }
    
    // Atualizar ano no footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Efeito magnético
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const distanceX = x - centerX;
            const distanceY = y - centerY;
            
            gsap.to(this, {
                x: distanceX * 0.2,
                y: distanceY * 0.2,
                duration: 0.5,
                ease: "power2.out"
            });
            
            const btnHover = this.querySelector('.btn-hover');
            if (btnHover) {
                gsap.to(btnHover, {
                    transform: 'scaleX(1)',
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
        
        el.addEventListener('mouseleave', function() {
            gsap.to(this, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
            });
            
            const btnHover = this.querySelector('.btn-hover');
            if (btnHover) {
                gsap.to(btnHover, {
                    transform: 'scaleX(0)',
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
    });
    
    // Modal de projeto
    const projectModals = document.querySelectorAll('.project-link[data-project]');
    const projectModal = document.getElementById('projectModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Dados dos projetos
    const projects = [
        {
            id: 1,
            title: "Landing Page Moderna",
            description: "Uma landing page responsiva e moderna criada com HTML, CSS e JavaScript. Design limpo com animações sutis para melhorar a experiência do usuário e aumentar as conversões.",
            technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
            link: "#"
        },
        {
            id: 2,
            title: "Portfólio Artístico",
            description: "Portfólio interativo para um artista local, criado com React e animações GSAP. Destaque para a galeria de trabalhos com efeitos de transição suaves.",
            technologies: ["React", "GSAP", "CSS Modules"],
            image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
            link: "#"
        },
        {
            id: 3,
            title: "Sistema de Dashboard",
            description: "Dashboard administrativo com gráficos interativos e visualização de dados. Desenvolvido com JavaScript puro e Chart.js para os componentes gráficos.",
            technologies: ["JavaScript", "Chart.js", "CSS3"],
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
            link: "#"
        }
    ];
    
    projectModals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = parseInt(this.getAttribute('data-project'));
            const project = projects.find(p => p.id === projectId);
            
            if (project) {
                document.getElementById('modalProjectImage').src = project.image;
                document.getElementById('modalProjectTitle').textContent = project.title;
                document.getElementById('modalProjectDescription').textContent = project.description;
                
                const techList = document.getElementById('modalProjectTech');
                techList.innerHTML = '';
                
                project.technologies.forEach(tech => {
                    const li = document.createElement('li');
                    li.textContent = tech;
                    techList.appendChild(li);
                });
                
                document.getElementById('modalProjectLink').href = project.link;
                
                projectModal.classList.add('active');
                document.body.classList.add('no-scroll');
            }
        });
    });
    
    // Modal de história
    const openStoryBtn = document.getElementById('openStoryBtn');
    const storyModal = document.getElementById('storyModal');
    
    if (openStoryBtn) {
        openStoryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            storyModal.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    }
    
    // Fechar modais
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.classList.remove('no-scroll');
        }
    });
    
    // Efeito de partículas
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#6c5ce7"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6c5ce7",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
});