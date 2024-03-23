            function toggleDarkMode ( event )
            {
                event.preventDefault();

                var body = document.body;

                if ( body.classList.contains( 'dark-mode' ) )
                {
                    body.classList.remove( 'dark-mode' );
                    body.style.backgroundColor = 'white';
                } else
                {
                    body.classList.add( 'dark-mode' );
                    body.style.backgroundColor = 'black';
                }
            }