import { useEffect, useState } from 'react';

export const useTawkTo = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Configurar Tawk.to cuando se carga
    const configureTawk = () => {
      if (window.Tawk_API) {
        // Configurar el widget para que esté oculto inicialmente
        window.Tawk_API.customStyle = {
          visibility: {
            desktop: {
              position: 'br',
              xOffset: 20,
              yOffset: 20
            },
            mobile: {
              position: 'br',
              xOffset: 10,
              yOffset: 10
            }
          },
          zIndex: 1000
        };

        // Configurar cuando se carga
        const originalOnLoad = window.Tawk_API.onLoad;
        window.Tawk_API.onLoad = function() {
          // Ejecutar el onLoad original si existe
          if (originalOnLoad) originalOnLoad();
          
          setIsLoaded(true);
          
          // Configurar en español
          window.Tawk_API.setAttributes({
            name: 'Visitante de Shock-Store',
            email: '',
            hash: ''
          }, function(error) {
            if (error) {
              console.warn('Error configurando Tawk.to:', error);
            }
          });
          
          // Configurar mensajes predeterminados en español
          if (window.Tawk_API.addEvent) {
            window.Tawk_API.addEvent({
              event: 'language',
              language: 'es'
            });
          }
        };

        // Detectar cuando hay agentes online
        window.Tawk_API.onStatusChange = function(status) {
          setIsOnline(status === 'online');
        };

        // Personalizar el widget
        window.Tawk_API.onChatMaximized = function() {
          // Analytics cuando se abre el chat
          if (window.gtag) {
            window.gtag('event', 'chat_opened', {
              event_category: 'engagement',
              event_label: 'tawk_to_chat'
            });
          }
        };
      }
    };

    // Esperar a que Tawk.to se cargue
    if (window.Tawk_API) {
      configureTawk();
    } else {
      // Polling para esperar que se cargue
      const checkTawk = setInterval(() => {
        if (window.Tawk_API) {
          configureTawk();
          clearInterval(checkTawk);
        }
      }, 500);

      // Cleanup después de 10 segundos
      setTimeout(() => {
        clearInterval(checkTawk);
      }, 10000);

      return () => clearInterval(checkTawk);
    }
  }, []);

  const openChat = (initialMessage = null) => {
    if (window.Tawk_API) {
      try {
        // Activar la clase CSS para mostrar el widget
        document.body.classList.add('tawk-active');
        
        // Mostrar el widget
        window.Tawk_API.showWidget();
        
        // Maximizar el chat
        setTimeout(() => {
          if (window.Tawk_API.maximize) {
            window.Tawk_API.maximize();
          }
          
          // Enviar mensaje inicial si se proporciona
          if (initialMessage) {
            setTimeout(() => {
              if (window.Tawk_API.addEvent) {
                window.Tawk_API.addEvent({
                  event: 'message',
                  message: initialMessage
                });
              }
            }, 500);
          }
        }, 100);
        
        return true;
      } catch (error) {
        console.error('Error abriendo chat:', error);
        return false;
      }
    }
    return false;
  };

  const hideWidget = () => {
    if (window.Tawk_API && window.Tawk_API.hideWidget) {
      window.Tawk_API.hideWidget();
    }
  };

  const showWidget = () => {
    if (window.Tawk_API && window.Tawk_API.showWidget) {
      window.Tawk_API.showWidget();
    }
  };

  const sendMessage = (message) => {
    if (window.Tawk_API && window.Tawk_API.addEvent) {
      window.Tawk_API.addEvent({
        event: 'message',
        message: message
      });
    }
  };

  return {
    isLoaded,
    isOnline,
    openChat,
    hideWidget,
    showWidget,
    sendMessage
  };
};